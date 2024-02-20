import { RatingScale } from "../RatingScale";
import { SubmitButton } from "../SubmitButton";

export default function Sleep() {
    return (
        <>
        <section className = 'container mx-auto'>
        <h1 className='text-3xl'>How well did you sleep?</h1>
        <RatingScale />
        <SubmitButton buttonName = 'Submit' />
        <SubmitButton buttonName = 'Skip' />
        </section>
        </>
    )
}