import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IOption, IShippingFields } from "./app.interfaces";
import Select from "react-select";
import { useState } from "react";

const options: IOption[] = [
  { value: "russia", label: "Russia" },
  { value: "usa", label: "USA" },
  { value: "china", label: "China" },
  { value: "paris", label: "Paris" },
];

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IShippingFields>({ mode: "onChange" });

  console.log("render");

  const onSubmit: SubmitHandler<IShippingFields> = (data) => {
    alert(`Your name ${data.adress.country}`);
    reset();
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Имя - обязательное поле!" })}
          type="text"
          placeholder="Введите Имя"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        <br />
        <input
          {...register("email", {
            required: "Почта - обязательное поле!",
            pattern: {
              value:
                /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
              message: "Введите валидный email",
            },
          })}
          type="text"
          placeholder="Введите почту"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        <Controller
          control={control}
          name="adress.country"
          rules={{ required: "Выберите страну из списка!" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                placeholder={"Countries"}
                options={options}
                onChange={(optionValue) =>
                  onChange((optionValue as IOption).value)
                }
              />
              {error && <p style={{ color: "red" }}>{error.message}</p>}
            </div>
          )}
        />

        <div>
          <button>send</button>
        </div>
      </form>
    </div>
  );
}

export default App;
