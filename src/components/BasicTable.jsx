import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';
import Table from 'react-bootstrap/Table';

const BasicTable = ({ columns, data }) => {
	const navigate = useNavigate();

	console.log(columns)
  
	const {
	  getTableProps,
	  getTableBodyProps,
	  headerGroups,
	  rows,
	  prepareRow,
	} = useTable({ columns, data });
  
	// const handleRowClick = (row) => {
	//   const movieId = row.original.id;
	//   if(row.original.media_type === "movie"){
	// 	navigate(`/movie/${movieId}`);
	//   }
	//   else if(row.original.media_type === "tv"){
	// 	navigate(`/tv/${movieId}`);
	//   }
	//   else if(row.original.media_type === "person") {
	// 	navigate(`/person/${movieId}`);
	//   }
	 
	// };

  
	return (
	  <div onClick={(e) => e.stopPropagation()}>
		<Table responsive hover {...getTableProps()}>
		  <thead>
			{headerGroups.map((headerGroup) => (
			  <tr {...headerGroup.getHeaderGroupProps()}>
				{headerGroup.headers.map((column) => (
				  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
				))}
			  </tr>
			))}
		  </thead>
  
		  <tbody {...getTableBodyProps()}>
			{rows.map((row) => {
			  prepareRow(row);
			  return (
				<tr className='table-row' key={row.id}>
				  {row.cells.map((cell) => (
					<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
				  ))}
				</tr>
			  );
			})}
		  </tbody>
		</Table>
	  </div>
	);
  };
  
  export default BasicTable;
  