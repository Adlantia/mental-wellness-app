type RatingButtonProps = {ratingOption: string}

export function RatingButton({ratingOption}: RatingButtonProps) {
    return (
        <button className = 'btn btn-circle focus:bg-slate-400' type="button">{ratingOption}</button>
    )
}