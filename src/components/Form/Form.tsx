import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import categories from '../../categories';

const schema = z.object({
  description: z
    .string()
    .min(3, { message: 'Description should be at least 3 characters.' })
    .max(50),
  amount: z
    .number({ invalid_type_error: 'Amount is required.' })
    .min(0.01)
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({ message: 'Category is required.' }),
  }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FormData) => void;
}

const Form = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className='mb-3'>
        <label className='form-label' htmlFor='description'>
          Description
        </label>
        <input
          {...register('description')}
          className='form-control'
          type='text'
          id='description'
        />
        {errors.description && (
          <p className='text-danger'>{errors.description.message}</p>
        )}
      </div>

      <div className='mb-3'>
        <label className='form-label' htmlFor='amount'>
          Amount
        </label>
        <input
          {...register('amount', { valueAsNumber: true })}
          className='form-control'
          type='number'
          id='amount'
        />
        {errors.amount && (
          <p className='text-danger'>{errors.amount.message}</p>
        )}
      </div>

      <div className='mb-3'>
        <label className='form-label' htmlFor='category'>
          Category
        </label>
        <select {...register('category')} className='form-select' id='category'>
          <option value=''></option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className='text-danger'>{errors.category.message}</p>
        )}
      </div>
      <button className='btn btn-primary' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default Form;
