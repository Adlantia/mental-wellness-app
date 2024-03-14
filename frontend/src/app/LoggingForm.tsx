import {RatingScale} from "@/app/RatingScale";
import {SubmitButton} from "@/app/SubmitButton";

export function LoggingForm() {
    return (
        <>
        <RatingScale />
        <div className = 'flex justify-center gap-4 my-6'>
            <SubmitButton buttonName = 'Submit' />
                    {/* <SubmitButton buttonName = 'Skip' /> */}
        </div>
    </>
    )
}