;


import {Login, SignInFormContent} from "@/app/login/LoginFormContent";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
import {SignIn, SignInSchema} from "@/utils/models/profile.model";
import {Formik, FormikHelpers, FormikProps} from "formik";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {DisplayError} from "@/app/components/displayError";
import {DisplayStatus} from "@/app/components/displayStatus";



export default function () {
return <Login />
}


