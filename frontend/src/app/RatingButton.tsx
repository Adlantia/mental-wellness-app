type RatingButtonProps = {value: string, ratingOption: string}

export function RatingButton({value}: RatingButtonProps, {ratingOption}: RatingButtonProps) {
    return (
        <button className = 'btn btn-circle focus:bg-slate-400' type="button">{value} {ratingOption}</button>
    )
}