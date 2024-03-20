import { RatingScale } from "../RatingScale";
import { SubmitButton } from "../SubmitButton";

export default function Sleep() {
    return (
        <>
        <section className = 'container'>
        <h1 className='text-3xl max-w-fit mx-auto py-4 mt-4'>How well did you sleep?</h1>
        <RatingScale />
        <div className = 'flex justify-center gap-4 my-6'>
        <SubmitButton buttonName = 'Submit' />
        <SubmitButton buttonName = 'Skip' />
        </div>
        </section>
        </>
    )
}