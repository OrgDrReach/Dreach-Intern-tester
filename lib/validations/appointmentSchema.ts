import * as z from 'zod';

export const AppointmentSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  
  email: z.string()
    .email({ message: 'Invalid email address' }),
  
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number' }),
  
  specialty: z.string()
    .min(1, { message: 'Please select a specialty' }),
  
  date: z.string()
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        return selectedDate >= today;
      },
      { message: 'Date must be today or in the future' }
    ),
  
  time: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Invalid time format' }),
});

export type AppointmentFormData = z.infer<typeof AppointmentSchema>;
