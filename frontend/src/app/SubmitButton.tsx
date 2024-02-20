type SubmitButtonProps = {buttonName: string}

export function SubmitButton({buttonName}: SubmitButtonProps) {
    return (
        <button className="btn btn-primary">{buttonName}</button>
    )
}