export interface ModalInterface {
    title: string,
    content?: string
    confirmButtonLabel: string,
    cancelButtonLabel: string,
    confirmAction: () => void
}