import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState, // Import SortingState
} from '@tanstack/react-table';
import { useDropzone } from 'react-dropzone';
import { supabase } from '../lib/supabase';
import type { Commission } from '../lib/supabase';
import { FiUpload, FiFile, FiTrash2, FiCheck } from 'react-icons/fi';
import Link from 'next/link';

const columnHelper = createColumnHelper<Commission>();

const probabilityOptions = ['bassa', 'media', 'alta'] as const;

interface CommissionTableProps {
  initialData?: Commission[];
  isClosedDealsPage?: boolean;
}

export default function CommissionTable({ initialData, isClosedDealsPage = false }: CommissionTableProps) {
  const [data, setData] = useState<Commission[]>(initialData || []);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]); // Corrected type for sorting
  const [globalFilter, setGlobalFilter] = useState('');

  const probabilityOrder = { bassa: 0, media: 1, alta: 2 };

  // Initialize table instance here so it's available in column definitions
  // Note: table instance needs to be defined BEFORE columns if columns depend on table state directly.
  // Using a memoized table and passing it into column definitions can sometimes cause issues.
  // A common pattern is to define columns first, then create the table.
  // For sorting indicators, we will pass the 'sorting' state from useState to the header.

  const columns = useMemo(
    () => [
      columnHelper.accessor('client', {
        header: ({ column }) => ( // Pass column to header for sorting state
          <span
            className="flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Client
            {column.getIsSorted() === 'asc' ? ' ↑' : column.getIsSorted() === 'desc' ? ' ↓' : ''}
          </span>
        ),
        cell: (info) => {
          const isEditing = editingRow === info.row.id;
          return isEditing ? (
            <input
              type="text"
              value={info.getValue()}
              onChange={(e) => {
                const newData = [...data];
                newData[info.row.index].client = e.target.value;
                setData(newData);
              }}
              className="w-full p-1 border rounded"
            />
          ) : (
            info.getValue()
          );
        },
        enableSorting: true,
      }),
      columnHelper.accessor('direct', {
        header: ({ column }) => ( // Pass column to header for sorting state
          <span
            className="flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Direct
            {column.getIsSorted() === 'asc' ? ' ↑' : column.getIsSorted() === 'desc' ? ' ↓' : ''}
          </span>
        ),
        cell: (info) => (
          <input
            type="checkbox"
            checked={info.getValue() || false}
            onChange={(e) => {
              const newData = [...data];
              newData[info.row.index].direct = e.target.checked;
              setData(newData);
            }}
            className="w-4 h-4"
          />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('titre', {
        header: ({ column }) => ( // Pass column to header for sorting state
          <span
            className="flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Titre
            {column.getIsSorted() === 'asc' ? ' ↑' : column.getIsSorted() === 'desc' ? ' ↓' : ''}
          </span>
        ),
        cell: (info) => (
          <input
            type="checkbox"
            checked={info.getValue() || false}
            onChange={(e) => {
              const newData = [...data];
              newData[info.row.index].titre = e.target.checked;
              setData(newData);
            }}
            className="w-4 h-4"
          />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('compromesso', {
        header: ({ column }) => ( // Pass column to header for sorting state
          <span
            className="flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Compromesso
            {column.getIsSorted() === 'asc' ? ' ↑' : column.getIsSorted() === 'desc' ? ' ↓' : ''}
          </span>
        ),
        cell: (info) => (
          <input
            type="checkbox"
            checked={info.getValue() || false}
            onChange={(e) => {
              const newData = [...data];
              newData[info.row.index].compromesso = e.target.checked;
              setData(newData);
            }}
            className="w-4 h-4"
          />
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('estimatedSaleDate', {
        header: ({ column }) => ( // Pass column to header for sorting state
          <span
            className="flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Estimated Sale Date
            {column.getIsSorted() === 'asc' ? ' ↑' : column.getIsSorted() === 'desc' ? ' ↓' : ''}
          </span>
        ),
        cell: (info) => {
          const isEditing = editingRow === info.row.id;
          return isEditing ? (
            <input
              type="date"
              value={info.getValue() || ''}
              onChange={(e) => {
                const newData = [...data];
                newData[info.row.index].estimatedSaleDate = e.target.value;
                setData(newData);
              }}
              className="w-full p-1 border rounded"
            />
          ) : (
            info.getValue() ? new Date(info.getValue()).toLocaleDateString() : ''
          );
        },
        sortingFn: (rowA, rowB) => {
          const a = rowA.getValue('estimatedSaleDate');
          const b = rowB.getValue('estimatedSaleDate');
          // Handle null/undefined dates by treating them as a very early date
          const dateA = a ? new Date(a).getTime() : 0;
          const dateB = b ? new Date(b).getTime() : 0;
          return dateA - dateB;
        },
        enableSorting: true,
      }),
      columnHelper.accessor('commission', {
        header: ({ column }) => ( // Pass column to header for sorting state
          <span
            className="flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Commission
            {column.getIsSorted() === 'asc' ? ' ↑' : column.getIsSorted() === 'desc' ? ' ↓' : ''}
          </span>
        ),
        cell: (info) => {
          const isEditing = editingRow === info.row.id;
          if (isEditing) {
            return (
              <input
                type="text"
                value={info.getValue() || ''}
                onChange={(e) => {
                  const newData = [...data];
                  newData[info.row.index].commission = e.target.value;
                  setData(newData);
                }}
                className="w-full p-1 border rounded"
              />
            );
          } else {
            const value = info.getValue();
            if (!value) return '';
            const num = parseInt(value.replace(/\D/g, ''), 10);
            return !isNaN(num) ? num.toLocaleString('de-DE') + ' Dhs' : value;
          }
        },
        sortingFn: (rowA, rowB) => {
          const getNum = (val: string | null) => { // Added type for val
            if (!val) return 0;
            const num = parseInt(String(val).replace(/\D/g, ''), 10);
            return isNaN(num) ? 0 : num;
          };
          return getNum(rowA.getValue('commission')) - getNum(rowB.getValue('commission'));
        },
        enableSorting: true,
      }),
      columnHelper.accessor('probability', {
        header: ({ column }) => ( // Pass column to header for sorting state
          <span
            className="flex items-center cursor-pointer select-none"
            onClick={column.getToggleSortingHandler()}
          >
            Probability
            {column.getIsSorted() === 'asc' ? ' ↑' : column.getIsSorted() === 'desc' ? ' ↓' : ''}
          </span>
        ),
        cell: (info) => {
          const isEditing = editingRow === info.row.id;
          return isEditing ? (
            <select
              value={info.getValue() || ''}
              onChange={(e) => {
                const newData = [...data];
                newData[info.row.index].probability = e.target.value as Commission['probability'];
                setData(newData);
              }}
              className="w-full p-1 border rounded"
            >
              <option value="">Select...</option>
              {probabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            info.getValue() || ''
          );
        },
        sortingFn: (rowA, rowB) => {
          const a = probabilityOrder[rowA.getValue('probability') as keyof typeof probabilityOrder] ?? -1; // Added type assertion
          const b = probabilityOrder[rowB.getValue('probability') as keyof typeof probabilityOrder] ?? -1; // Added type assertion
          return a - b;
        },
        enableSorting: true,
      }),
      columnHelper.accessor('documents', {
        header: 'Documents',
        cell: (info) => (
          <div className="flex gap-2 flex-wrap">
            {info.getValue()?.map((doc, index) => (
              <div key={index} className="flex items-center gap-1">
                <FiFile className="text-gray-500" />
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {doc.name}
                </a>
              </div>
            ))}
            <FileUploadButton rowId={info.row.id} />
          </div>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        cell: (info) => (
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (editingRow === info.row.id) {
                  // Save changes
                  saveRow(info.row.original);
                  setEditingRow(null);
                } else {
                  setEditingRow(info.row.id);
                }
              }}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingRow === info.row.id ? 'Save' : 'Edit'}
            </button>
            <button
              onClick={() => deleteRow(info.row.original.id)}
              className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              <FiTrash2 />
            </button>
            {!isClosedDealsPage && (
              <button
                onClick={() => closeDeal(info.row.original)}
                className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                <FiCheck />
              </button>
            )}
          </div>
        ),
      }),
    ],
    [data, editingRow, isClosedDealsPage, sorting]
  );

  // setColumns is crucial to update memoized columns in the table instance
  table.setColumns(columns);

  const saveRow = async (row: Commission) => {
    console.log('Attempting to save row:', row);
    const { error } = await supabase
      .from('commissions')
      .upsert({ ...row, updated_at: new Date().toISOString() });
    
    if (error) {
      console.error('Error saving row:', error);
      alert('Failed to save changes: ' + error.message);
    } else {
      console.log('Row saved successfully!', row);
      alert('Changes saved!');
    }
  };

  const deleteRow = async (id: string) => {
    const { error } = await supabase
      .from('commissions')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting row:', error);
      alert('Failed to delete row: ' + error.message);
    } else {
      setData(data.filter((row) => row.id !== id));
      alert('Row deleted successfully!');
    }
  };

  const closeDeal = async (row: Commission) => {
    const confirmed = window.confirm('Are you sure you want to move this deal to Closed Deals?');
    if (!confirmed) return;

    const { error } = await supabase
      .from('commissions')
      .update({ isclosed: true, updated_at: new Date().toISOString() })
      .eq('id', row.id);
    
    if (error) {
      console.error('Error closing deal:', error);
      alert('Failed to close deal: ' + error.message);
    } else {
      setData(data.filter((r) => r.id !== row.id));
      alert('Deal closed successfully!');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="p-2 border rounded min-w-[200px]"
          />
          {!isClosedDealsPage && (
            <Link
              href="/closed-deals"
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              View Closed Deals
            </Link>
          )}
        </div>
        {/* Export CSV button removed */}
      </div>
      <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    className={
                      `px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-normal break-words ` +
                      (header.column.getCanSort() ? 'cursor-pointer select-none' : '')
                    }
                    style={{ maxWidth: 160 }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' ? ' ↑' : header.column.getIsSorted() === 'desc' ? ' ↓' : ''}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`transition-colors ${
                  row.original.probability === 'alta'
                    ? 'bg-blue-50'
                    : row.original.probability === 'bassa'
                    ? 'bg-red-50' // Added color for 'bassa'
                    : row.original.probability === 'media'
                    ? 'bg-yellow-50'
                    : ''
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2 align-middle text-sm whitespace-normal break-words" style={{ maxWidth: 160 }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FileUploadButton({ rowId }: { rowId: string }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      for (const file of acceptedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${rowId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Error uploading file:', uploadError);
          alert('Error uploading file: ' + uploadError.message);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        // Update the row's documents array
        const { data: row } = await supabase
          .from('commissions')
          .select('documents')
          .eq('id', rowId)
          .single();

        const updatedDocuments = [
          ...(row?.documents || []),
          { name: file.name, url: publicUrl },
        ];

        const { error: updateError } = await supabase
          .from('commissions')
          .update({ documents: updatedDocuments })
          .eq('id', rowId);

        if (updateError) {
          console.error('Error updating documents:', updateError);
          alert('Error updating documents: ' + updateError.message);
        } else {
          alert('File uploaded and documents updated!');
          // You might need to refresh the data in the table here
          // This would involve re-fetching the commissions for the current page
        }
      }
    },
  });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <FiUpload className="text-gray-500 hover:text-gray-700" />
    </div>
  );
}