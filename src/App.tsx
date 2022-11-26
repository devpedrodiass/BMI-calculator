import { useMemo, useState } from 'react'
import Select from 'react-select'
import Card from './components/Card/Card'

const GENDER_OPTIONS = [
  {
    label: 'Others',
    value: '1',
  },
  {
    label: 'Woman',
    value: '2',
  },
  {
    label: 'Men',
    value: '3',
  },
]

enum ERRORS_TYPES {
  GENDER = 'gender',
  WEIGHT = 'weight',
  HEIGHT = 'height',
}

const ERRORS_MESSAGES = {
  gender: 'Please, select your gender.',
  weight: 'Please, type your weight.',
  height: 'Please, type your height.',
}

const CONDITIONS_MESSAGES = {
  belowNormal:
    "Look for a doctor. Some people are underweight due to the characteristics of their body and that's ok. Others may be experiencing problems such as malnutrition. You need to know what the case is.",
  normal:
    "Glad you're at your normal weight! And the best way to stay that way is to maintain an active lifestyle and a balanced diet.",
  overWeight:
    'He is, in fact, a pre-obesity and many people in this range already have associated diseases, such as diabetes and hypertension. It is important to review habits and seek help before, due to a series of factors, entering the obesity range for real.',
  obesityGradeOne:
    "Warning sign! It's time to take care of yourself, even if your exams are normal. Let's start the changes today! Take care of your food. You need to start a follow-up with a nutritionist and/or endocrinologist.",
  obesityGradeTwo:
    "Even if your exams appear to be normal, it's time to take care of yourself, initiating lifestyle changes with close monitoring of health professionals.",
  obesityGradeThree:
    'Here the signal is red, with a strong probability that there are already very serious diseases associated. Treatment must be even more urgent.',
}

enum BMIConditions {
  belowNormal = 'Below Normal',
  normal = 'Normal',
  overWeight = 'Overweight',
  obesityGradeOne = 'Obesity Grade I',
  obesityGradeTwo = 'Obesity Grade II',
  obesityGradeThree = 'Obesity Grade III',
}

type Conditions =
  | 'belowNormal'
  | 'normal'
  | 'overWeight'
  | 'obesityGradeOne'
  | 'obesityGradeTwo'
  | 'obesityGradeThree'

function App() {
  const [gender, setGender] = useState<typeof GENDER_OPTIONS[0] | 0>()
  const [weight, setWeight] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [result, setResult] = useState<number>()
  const [hasErrorOn, setHasErrorOn] = useState<ERRORS_TYPES | undefined>()
  const [BMICondition, setBMICondition] = useState<Conditions>()

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    if (!gender) return handleErrors(ERRORS_TYPES.GENDER)
    if (weight === 0) return handleErrors(ERRORS_TYPES.WEIGHT)
    if (height === 0) return handleErrors(ERRORS_TYPES.HEIGHT)

    if (weight > 0 && height > 0) {
      setHasErrorOn(undefined)
      const currentResult = calculate(weight, height)
      const currentBMICondition = checkBMICondition(currentResult)
      setBMICondition(currentBMICondition)
      setResult(currentResult)
    }
  }

  const handleResetForm = () => {
    setGender(0)
    setWeight(0)
    setHeight(0)
    setResult(undefined)
  }

  const calculate = (weight: number, height: number) => {
    const result = weight / (height / 100) ** 2
    return Number(result.toFixed(2))
  }

  const getErrorMessage = () => {
    if (!hasErrorOn) return ''
    return ERRORS_MESSAGES[hasErrorOn]
  }

  const handleErrors = (errorType: ERRORS_TYPES | undefined) => {
    setHasErrorOn(errorType)
  }

  const checkBMICondition = (result: number) => {
    if (0 < result && result < 18.5) {
      return 'belowNormal'
    }
    if (18.6 < result && result < 24.9) {
      return 'normal'
    }
    if (25 < result && result < 29.9) {
      return 'overWeight'
    }
    if (30 < result && result < 34.9) {
      return 'obesityGradeOne'
    }
    if (35 < result && result < 39.9) {
      return 'obesityGradeTwo'
    }
    if (40 < result) {
      return 'obesityGradeThree'
    }
    return 'normal'
  }

  const errorMessage = getErrorMessage()

  const hasResult = result

  return (
    <div className="min-w-screen min-h-screen bg-blue-100 gap-4 p-2 flex flex-col items-center">
      {/* App Title */}
      <h1 className="font-bold text-5xl text-center text-[#2684ff] animate-slideDown">
        BMI Calculator
      </h1>

      <main className="flex flex-col gap-2 max-w-[890px] w-full items-center animate-slideLeft">
        <Card>
          {/* About */}
          <section className="flex flex-col items-center gap-2">
            {/* About */}
            <h1 className="text-xl font-bold">About</h1>
            <p className="text-sm ml-4 text-center">
              Know your body mass index quickly and easily and how it can affect
              your daily life.
            </p>
          </section>

          {/* Divider */}
          <div className="h-[1px] w-[70%] bg-blue-200"></div>

          <section className="flex flex-col items-center gap-2">
            {/* Calculator */}
            <h1 className="text-xl font-bold">Calculator</h1>

            {/* Form */}
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col items-center gap-4">
              {/* Gender */}
              <label htmlFor="gender">Choose your gender:</label>
              <Select
                value={gender}
                onChange={(selectedGender) =>
                  setGender(selectedGender as typeof GENDER_OPTIONS[0])
                }
                options={GENDER_OPTIONS}
                isClearable
                id="gender"
                name="gender"
              />

              {/* Weight */}
              <label htmlFor="weight">
                Type your Weight <i>(kg)</i>:
              </label>
              <input
                id="weight"
                name="weight"
                type="number"
                min="0"
                placeholder="e.g. 56"
                className="border-[1px] transition-all duration-200 border-[#cccccc] rounded-[4px] focus:outline-2 outline-[#2684ff] px-2 py-1"
                value={weight}
                onChange={(e) => {
                  setWeight(Number(e.target.value))
                }}
              />

              {/* Height */}
              <label htmlFor="weight">
                Type your Height <i>(cm)</i>:
              </label>
              <input
                id="height"
                name="height"
                type="number"
                placeholder="e.g. 168"
                min="0"
                className="border-[1px] transition-all duration-200 border-[#cccccc] rounded-[4px] focus:outline-2 outline-[#2684ff] px-2 py-1"
                value={height}
                onChange={(e) => {
                  setHeight(Number(e.target.value))
                }}
              />

              {/* Error Message */}
              <p className="text-red-500">{errorMessage}</p>

              {/* Actions Buttons */}
              <div className="flex flex-row gap-2">
                {/* Submit Button */}
                <button
                  type="submit"
                  className="border-[1px] border-[#2684ff] bg-[#2684ff] transition-all duration-200  rounded-[4px] text-white px-2 py-1  hover:bg-white hover:text-[#2684ff]">
                  Calculate
                </button>

                {/* Reset Button */}
                {hasResult && (
                  <button
                    onClick={handleResetForm}
                    type="button"
                    className="border-[1px] border-red-500 bg-red-200 transition-all duration-200 text-red-500 rounded-[4px] px-2 py-1  hover:bg-white  w-8 h-8">
                    X
                  </button>
                )}
              </div>
            </form>

            {/* Result Section */}
            {hasResult && (
              <section className="flex flex-col gap-2 items-center p-4 shadow-lg rounded-md bg-white mt-4 animate-opacityChange ">
                <p className="text-center">
                  <b>Perfect!</b> Here is your BMI:
                </p>

                {/* Result Number */}
                <span className="shadow-lg p-2 rounded-md text-white font-bold text-md bg-[#2684ff]">
                  {result}
                </span>
                {/* Divider */}
                <div className="w-[40%] h-[1px] bg-blue-200"></div>

                {/* Condition Title */}
                <span className="font-bold ">
                  {BMICondition && BMIConditions[BMICondition]}
                </span>

                {/* Condition Text */}
                <div className="w-[10%] h-[1px] bg-blue-200"></div>
                <p className="text-center">
                  {BMICondition && CONDITIONS_MESSAGES[BMICondition]}
                </p>
              </section>
            )}
          </section>
        </Card>
      </main>
    </div>
  )
}

export default App
