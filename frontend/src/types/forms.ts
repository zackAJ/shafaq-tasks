export type ValidationErrorBag =
{
  [key: string]: string[]
}

export type LoginForm = {
  email: string;
  password: string;
}

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export type CreateTaskForm = {
  title: string;
  description: string | null;
  due_date: string;
  status: string;
}
