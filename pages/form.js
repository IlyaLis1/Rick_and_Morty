import Head from "next/head";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../components";

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("Имя обязательно"),
    lastName: yup.string().required("Фамилия обязательна"),
  })
  .required();

export default function Form() {
  // handleSubmit,
  // register,
  // getValues,
  // watch,
  // formState,
  // setValue,
  // reset,
  // getFieldState,
  const methods = useForm({
    // defaultValues: async () => {
    //     // запрос на сервер
    // },
    defaultValues: {
      password: "John",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: true,
    resolver: yupResolver(schema),
  });

  const { isDirty, errors } = methods.formState;

  console.log(methods.watch("firstName"));

  console.log(isDirty, "isDirty");

  console.log(errors, "errors");

  console.log(methods.getFieldState("firstName"), "firstName field state");

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FormProvider {...methods}>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "30%",
            margin: "40px auto",
          }}
          onSubmit={methods.handleSubmit(console.log)}
        >
          <Input
            type="text"
            {...methods.register("firstName")}
            {...methods.getFieldState("firstName")}
          />
          <Input
            type="text"
            {...methods.register("lastName")}
            {...methods.getFieldState("lastName")}
          />
          <input type="password" {...methods.register("password")} />
          <Controller
            control={methods.control}
            name="test"
            render={({
              field,
              // field: { onChange, onBlur, value, name, ref },
              fieldState: { error },
              // formState,
            }) => <Input type="password" {...field} error={error} />}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <button
              type="button"
              onClick={() => console.log(methods.getValues("lastName"))}
            >
              Назад
            </button>
            <button disabled={!isDirty}>Зарегистрироваться</button>
            <button
              type="button"
              onClick={() =>
                console.log(methods.setValue("firstName", "Dan", { shouldDirty: true }))
              }
            >
              Изменить имя
            </button>
            <button
              type="button"
              onClick={() => methods.reset({ firstName: "Robin", lastName: "" })}
            >
              Отчистить форму
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
