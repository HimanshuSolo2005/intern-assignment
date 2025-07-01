import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

type JobRequest = {
  id: number;
  jobRequest: string;
  submitted: string;
  status: 'In-process' | 'Need to start' | 'Complete' | 'Blocked';
  submitter: string;
  url: string;
  assigned: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  estValue: string;
};

// Create a column helper for type safety
const columnHelper = createColumnHelper<JobRequest>();

const columns = [
  columnHelper.accessor('id', {
    header: '', // Empty header for the checkbox/row number column
    id: 'rowSelection', // Give it a unique ID
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-blue-600 rounded" // Tailwind form-checkbox styling
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          aria-label={`Select row ${row.index + 1}`}
        />
        <span className="text-xs text-gray-500">{row.index + 1}</span> {/* Row number */}
      </div>
    ),
    size: 60, // Adjust width for checkbox + number
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('jobRequest', {
    header: 'Job Request',
    cell: (info) =>
      info.getValue() ? ( // Only render if not empty
        <div className="flex items-center">
          <span className="text-gray-400 mr-1 text-xs">Job Request</span>
          <span className="truncate">{info.getValue()}</span>
          <span className="text-gray-400 ml-auto mr-1">...</span>
        </div>
      ) : null,
    size: 250,
  }),
  columnHelper.accessor('submitted', {
    header: 'Submitted',
    cell: (info) => info.getValue(),
    size: 120, // Adjusted slightly
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      let bgColor = '';
      let textColor = '';
      switch (status) {
        case 'In-process':
          bgColor = 'bg-blue-100';
          textColor = 'text-blue-700';
          break;
        case 'Need to start':
          bgColor = 'bg-yellow-100';
          textColor = 'text-yellow-700';
          break;
        case 'Complete':
          bgColor = 'bg-green-100';
          textColor = 'text-green-700';
          break;
        case 'Blocked':
          bgColor = 'bg-red-100';
          textColor = 'text-red-700';
          break;
        default:
          bgColor = 'bg-gray-100';
          textColor = 'text-gray-700';
      }
      return status ? (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
          {status}
        </span>
      ) : null;
    },
    size: 120, // Adjusted slightly
  }),
  columnHelper.accessor('submitter', {
    header: 'Submitter',
    cell: (info) => info.getValue(),
    size: 120, // Adjusted slightly
  }),
  columnHelper.accessor('url', {
    header: 'URL',
    cell: (info) =>
      info.getValue() ? (
        <a
          href={`http://${info.getValue()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {info.getValue().replace('www.', '')}
        </a>
      ) : null,
    size: 120, // Adjusted slightly
  }),
  columnHelper.accessor('assigned', {
    header: () => (
      <div className="flex items-center gap-1">
        <span className="text-purple-600 font-bold">ABC</span> Assigned
      </div>
    ),
    cell: (info) => info.getValue(),
    size: 120, // Adjusted slightly
    meta: {
      headerBgColor: 'bg-purple-100', // Custom meta for header background
      headerTextColor: 'text-purple-700',
    },
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: (info) => {
      const priority = info.getValue();
      let colorClass = '';
      if (!priority) return null;
      switch (priority) {
        case 'High':
          colorClass = 'text-red-600';
          break;
        case 'Medium':
          colorClass = 'text-yellow-600';
          break;
        case 'Low':
          colorClass = 'text-blue-600';
          break;
        default:
          colorClass = 'text-gray-600';
      }
      return <span className={`font-medium ${colorClass}`}>{priority}</span>;
    },
    size: 100, // Adjusted slightly
  }),
  columnHelper.accessor('dueDate', {
    header: 'Due Date',
    cell: (info) => info.getValue(),
    size: 120, // Adjusted slightly
    meta: {
      headerBgColor: 'bg-purple-100',
      headerTextColor: 'text-purple-700',
    },
  }),
  columnHelper.accessor('estValue', {
    header: 'Est. Value',
    cell: (info) => info.getValue(),
    size: 120, // Adjusted slightly
    meta: {
      headerBgColor: 'bg-purple-100',
      headerTextColor: 'text-purple-700',
    },
  }),
];
// Sample Data (mimicking your screenshot)
const defaultData: JobRequest[] = [
  {
    id: 1,
    jobRequest: 'Launch social media campaign for pro...',
    submitted: '15-11-2024',
    status: 'In-process',
    submitter: 'Aisha Patel',
    url: 'www.aishapatel.com',
    assigned: 'Sophia Choudhury',
    priority: 'Medium',
    dueDate: '20-11-2024',
    estValue: '6,200,000',
  },
  {
    id: 2,
    jobRequest: 'Update press kit for company redesign',
    submitted: '28-10-2024',
    status: 'Need to start',
    submitter: 'Irfan Khan',
    url: 'www.irfankhan.com',
    assigned: 'Tejas Pandey',
    priority: 'High',
    dueDate: '30-10-2024',
    estValue: '3,500,000',
  },
  {
    id: 3,
    jobRequest: 'Finalize user testing feedback for app-...',
    submitted: '05-12-2024',
    status: 'In-process',
    submitter: 'Mark Johnson',
    url: 'www.markjohnson.com',
    assigned: 'Rachel Lee',
    priority: 'Medium',
    dueDate: '10-12-2024',
    estValue: '4,750,000',
  },
  {
    id: 4,
    jobRequest: 'Design new features for the website',
    submitted: '10-01-2025',
    status: 'Complete',
    submitter: 'Emily Green',
    url: 'www.emilygreen.com',
    assigned: 'Tom Wright',
    priority: 'Low',
    dueDate: '15-01-2025',
    estValue: '5,800,000',
  },
  {
    id: 5,
    jobRequest: 'Prepare financial report for Q4',
    submitted: '25-01-2025',
    status: 'Blocked',
    submitter: 'Jessica Brown',
    url: 'www.jessicabrown.com',
    assigned: 'Kevin Smith',
    priority: 'Low',
    dueDate: '30-01-2025',
    estValue: '2,800,000',
  },
  ...Array(20)
    .fill(null)
    .map((_, i) => ({
      id: 6 + i,
      jobRequest: '',
      submitted: '',
      status: 'In-process' as 'In-process', // Default status, will be hidden by empty content
      submitter: '',
      url: '',
      assigned: '',
      priority: 'Low' as 'Low', // Default priority, will be hidden by empty content
      dueDate: '',
      estValue: '',
    })),
];

function App() {
  const [data] = React.useState(() => [...defaultData]); // Use useState for data

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Left part of header: "Tool bar", "Hide fields", "Sort", "Filter", "Cell view" */}
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded-md text-sm hover:bg-gray-100"
              onClick={() => console.log('Tool bar clicked')}
            >
              Tool bar
            </button>
            <button
              className="px-3 py-1 rounded-md text-sm hover:bg-gray-100"
              onClick={() => console.log('Hide fields clicked')}
            >
              Hide fields
            </button>
            <button
              className="px-3 py-1 rounded-md text-sm hover:bg-gray-100"
              onClick={() => console.log('Sort clicked')}
            >
              Sort
            </button>
            <button
              className="px-3 py-1 rounded-md text-sm hover:bg-gray-100"
              onClick={() => console.log('Filter clicked')}
            >
              Filter
            </button>
            <button
              className="px-3 py-1 rounded-md text-sm hover:bg-gray-100"
              onClick={() => console.log('Cell view clicked')}
            >
              Cell view
            </button>
          </div>
        </div>

        {/* Right part of header: Search, user, actions */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search within sheet"
              className="pl-8 pr-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => console.log('Search input:', e.target.value)}
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
              onClick={() => console.log('Notifications clicked')}
            >
              🔔
            </button>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
              onClick={() => console.log('Help clicked')}
            >
              ❓
            </button>
            <div
              className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold"
              onClick={() => console.log('User profile clicked')}
            >
              JD
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded-md text-sm border border-gray-300 hover:bg-gray-100"
              onClick={() => console.log('Import clicked')}
            >
              Import
            </button>
            <button
              className="px-3 py-1 rounded-md text-sm border border-gray-300 hover:bg-gray-100"
              onClick={() => console.log('Export clicked')}
            >
              Export
            </button>
            <button
              className="px-3 py-1 rounded-md text-sm border border-gray-300 hover:bg-gray-100"
              onClick={() => console.log('Share clicked')}
            >
              Share
            </button>
            <button
              className="px-3 py-1 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
              onClick={() => console.log('New Action clicked')}
            >
              <span className="text-xl">+</span> New Action
            </button>
          </div>
        </div>
      </header>

      {/* Top-left navigation/title section */}
      <div className="bg-white px-4 py-2 flex items-center text-sm border-b border-gray-200">
        <div className="flex items-center gap-1 text-gray-500">
          <span className="font-semibold text-gray-700">Workspace</span>{' '}
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-700">Folder 2</span>{' '}
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-700">Spreadsheet 3</span>
          <span
            className="ml-2 text-blue-600 font-bold cursor-pointer"
            onClick={() => console.log('Ellipsis dropdown clicked')}
          >
            ...
          </span>{' '}
          {/* Placeholder for ellipsis/dropdown */}
        </div>
        <div
          className="ml-4 px-3 py-1 rounded-md bg-purple-100 text-purple-700 font-semibold text-xs flex items-center gap-1 cursor-pointer"
          onClick={() => console.log('Q3 Financial Overview dropdown clicked')}
        >
          <span className="text-lg">📊</span> Q3 Financial Overview{' '}
          <span className="text-lg ml-1">🔽</span> {/* Placeholder for dropdown */}
        </div>
      </div>

      <main className="flex flex-grow overflow-hidden">
        <div className="overflow-x-auto">
          <div className="flex-1 p-4 overflow-auto">
            {/* "Job Request" title */}
            <h2 className="text-2xl font-bold mb-4">Job Request</h2>

            {/* Spreadsheet Grid goes here */}
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              {' '}
              {/* Added border-gray-200 for outer table border */}
              <table className="w-full border-collapse">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-gray-100">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className={`p-2 text-left text-xs font-semibold text-gray-600 border-b border-r border-gray-200 first:border-l last:border-r-0 h-8 relative
                                    ${(header.column.columnDef.meta as any)?.headerBgColor || 'bg-gray-100'}
                                    ${(header.column.columnDef.meta as any)?.headerTextColor || 'text-gray-600'}
                                    `}
                          style={{ width: header.getSize() !== 0 ? header.getSize() : undefined }}
                        >
                          {header.isPlaceholder ? null : (
                            <div className="flex items-center gap-1">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {/* Sort and Filter Icons */}
                              <div className="flex items-center ml-1 space-x-1 absolute right-2 top-1/2 -translate-y-1/2">
                                {' '}
                                {/* Position icons to the right */}
                                {/* Sort Icon (e.g., small triangle) */}
                                {(header.column.id === 'submitted' ||
                                  header.column.id === 'status' ||
                                  header.column.id === 'submitter' ||
                                  header.column.id === 'url' ||
                                  header.column.id === 'assigned' ||
                                  header.column.id === 'priority' ||
                                  header.column.id === 'dueDate' ||
                                  header.column.id === 'estValue') && (
                                  <span className="text-gray-400 text-[8px] transform rotate-180 inline-block align-middle">
                                    ▲
                                  </span> // Up/Down triangle for sort
                                )}
                                {/* Filter Icon (e.g., small rectangle or dots) */}
                                {(header.column.id === 'status' ||
                                  header.column.id === 'assigned' ||
                                  header.column.id === 'priority' ||
                                  header.column.id === 'dueDate' ||
                                  header.column.id === 'estValue') && ( // Apply to these specific columns
                                  <span className="text-gray-400 text-xs">🞂</span> // Simple filter icon placeholder
                                )}
                              </div>
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="group hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="p-2 text-sm text-gray-700 border-r border-gray-100 first:border-l last:border-r-0 h-8"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer tabs */}
      <footer className="bg-white shadow-inner p-3 flex items-center justify-start gap-4 text-sm border-t border-gray-200">
        <button
          className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-semibold"
          onClick={() => console.log('All Orders tab clicked')}
        >
          All Orders
        </button>
        <button
          className="px-4 py-2 border-b-2 border-transparent text-gray-600 hover:border-gray-300"
          onClick={() => console.log('Pending tab clicked')}
        >
          Pending
        </button>
        <button
          className="px-4 py-2 border-b-2 border-transparent text-gray-600 hover:border-gray-300"
          onClick={() => console.log('Reviewed tab clicked')}
        >
          Reviewed
        </button>
        <button
          className="px-4 py-2 border-b-2 border-transparent text-gray-600 hover:border-gray-300"
          onClick={() => console.log('Arrived tab clicked')}
        >
          Arrived
        </button>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 text-lg"
          onClick={() => console.log('Add tab clicked')}
        >
          +
        </button>
      </footer>
    </div>
  );
}

export default App;
