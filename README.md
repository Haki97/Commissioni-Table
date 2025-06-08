# Real Estate Commission Management System

A modern web application for managing real estate commissions, built with Next.js, React, TailwindCSS, and Supabase.

## Features

- Interactive data table with inline editing
- File upload and management for each commission
- Row highlighting based on probability
- Export to CSV
- Filtering and sorting capabilities
- Modern, responsive UI with TailwindCSS

## Prerequisites

- Node.js 16.x or later
- npm or yarn
- Supabase account

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd real-estate-commission
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a Supabase project and get your project URL and anon key.

4. Create a `.env.local` file in the root directory with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. Set up the Supabase database:
   - Go to your Supabase project dashboard
   - Navigate to the SQL editor
   - Copy and paste the contents of `supabase/migrations/20240101000000_create_commissions_table.sql`
   - Run the SQL commands

6. Create a storage bucket:
   - In your Supabase dashboard, go to Storage
   - Create a new bucket named "documents"
   - Set the bucket's privacy settings to allow authenticated uploads

7. Start the development server:
```bash


# or
yarn dev
```

8. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Add new commissions by clicking the "Add" button
- Edit existing commissions by clicking the "Edit" button on any row
- Upload documents by dragging and dropping files onto the upload area
- Filter and sort the table using the column headers
- Export data to CSV using the "Export CSV" button
- View document previews by clicking on document links

## Technologies Used

- Next.js
- React
- TailwindCSS
- Supabase (Database & Storage)
- TanStack Table (React Table)
- React Dropzone
- React Icons

## License

MIT 