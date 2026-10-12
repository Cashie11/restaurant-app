import time
from collections import defaultdict, deque
from typing import Deque, Dict

from fastapi import HTTPException, Request


class SlidingWindowRateLimiter:
    """A simple in-memory sliding-window rate limiter.

    Suitable for single-process deployments. For multi-worker / production
    deployments, use Redis or a reverse proxy (nginx / Cloudflare) limiter
    instead.
    """

    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._hits: Dict[str, Deque[float]] = defaultdict(deque)

    def _is_allowed(self, key: str) -> bool:
        now = time.time()
        dq = self._hits[key]
        cutoff = now - self.window_seconds
        while dq and dq[0] < cutoff:
            dq.popleft()
        if len(dq) >= self.max_requests:
            return False
        dq.append(now)
        return True

    def __call__(self, request: Request):
        client_ip = request.client.host if request.client else "unknown"
        if not self._is_allowed(client_ip):
            raise HTTPException(
                status_code=429,
                detail="Too many requests. Please slow down and try again shortly.",
            )


# Auth endpoints: 20 requests per minute per IP (brute-force / abuse protection)
auth_rate_limit = SlidingWindowRateLimiter(max_requests=20, window_seconds=60)
