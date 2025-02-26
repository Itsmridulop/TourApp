import { useForm } from "react-hook-form"
import { useSignup } from "./useSignup"

import Footer from "../../component/Footer"
import Spinner from "../../component/Spinner";

function Signup() {

  const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm<{ email: string; name: string; password: string; confirmPassword: string }>()
  const { signup, isPending } = useSignup()

  const submitHandler = (data: { email: string; name: string; password: string; confirmPassword: string }) => {
    signup(data, {
      onSettled: () => reset()
    })
  }

  if (isPending) return <Spinner />

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col mt-20 flex-grow items-center justify-center">
        <div className="bg-white shadow-2xl rounded-lg p-20 w-screen max-w-2xl mx-4 lg:mx-0">
          <h2 className="text-3xl font-semibold text-green-500 text-center mb-10">
            CREATE YOUR ACCOUNT!
          </h2>

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Your name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-5 py-4 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("name", {
                  required: 'This field is required'
                })}
              />
              {errors?.name?.message && <div>{errors.name.message}</div>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-5 py-4 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("email", {
                  required: 'This field is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please Enter a valid email'
                  }
                })}
              />
              {errors?.email?.message && <div>{errors.email.message}</div>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                placeholder="• • • • • • • •"
                type="password"
                id="password"
                className="w-full px-5 py-4 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
              />
              {errors?.password?.message && <div>{errors.password.message}</div>}
            </div>

            <div className="mb-10">
              <label className="block text-gray-700 mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                placeholder="• • • • • • • •"
                type="password"
                id="confirmPassword"
                className="w-full px-5 py-4 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register('confirmPassword', {
                  required: 'This field is required',
                  validate: (value) => value === getValues().password || 'Passwords do not match'
                })}
              />
              {errors?.confirmPassword?.message && <div>{errors.confirmPassword.message}</div>}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-4 rounded-full font-medium text-lg hover:bg-green-600 transition duration-300"
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Signup
