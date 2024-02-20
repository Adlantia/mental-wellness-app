import { RatingScale } from "../RatingScale";
import { SubmitButton } from "../SubmitButton";

export default function Mood() {
    return (
        <>
        <section className = 'container mx-auto items-center'>
        <h1 className='text-3xl'>How are you feeling today?</h1>
        <RatingScale />
        <SubmitButton buttonName = 'Submit' />
        <SubmitButton buttonName = 'Skip' />
        </section>
        </>
    )
}