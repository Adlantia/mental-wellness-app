import {RatingButton} from "./RatingButton";
import {Form} from "formik";

export function RatingScale() {
    return (
        <>
            <Form>
                <div className='flex justify-center my-6'>
                    <RatingButton value={'1'} ratingOption='1'/>
                    <RatingButton value={'2'} ratingOption='2'/>
                    <RatingButton value={'3'} ratingOption='3'/>
                    <RatingButton value={'4'} ratingOption='4'/>
                    <RatingButton value={'5'} ratingOption='5'/>
                </div>
            </Form>
        </>
    )
}

