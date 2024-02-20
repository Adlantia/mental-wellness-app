type RatingButtonProps = {ratingOption: string}

export function RatingButton({ratingOption}: RatingButtonProps) {
    return (
        <button className = 'btn btn-circle'>{ratingOption}</button>
    )
}