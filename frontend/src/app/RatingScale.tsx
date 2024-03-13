import { RatingButton } from "./RatingButton";

export function RatingScale () {
    return (
        <>
        <div className = 'flex justify-center my-6'>
        <RatingButton ratingOption = '1' />
        <RatingButton ratingOption = '2' />
        <RatingButton ratingOption = '3' />
        <RatingButton ratingOption = '4' />
        <RatingButton ratingOption = '5' />
        </div>
        </>
    )
}