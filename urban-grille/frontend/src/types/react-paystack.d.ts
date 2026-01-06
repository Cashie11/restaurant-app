declare module 'react-paystack' {
    export interface PaystackProps {
        publicKey: string;
        email: string;
        amount: number;
        reference?: string;
        metadata?: any;
        currency?: string;
        channels?: string[];
        label?: string;
        onSuccess?: (reference: any) => void;
        onClose?: () => void;
        subaccount?: string;
        transaction_charge?: number;
        bearer?: string;
        split?: any;
        split_code?: string;
    }

    export const usePaystackPayment: (config: PaystackProps) => (options?: { onSuccess?: (reference: any) => void; onClose?: () => void }) => void;

    export const PaystackButton: React.FC<PaystackProps & { className?: string; text?: string }>;

    export const PaystackConsumer: React.FC<PaystackProps & { children: (args: { initializePayment: (options?: { onSuccess?: (reference: any) => void; onClose?: () => void }) => void }) => React.ReactNode }>;
}
