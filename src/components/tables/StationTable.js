import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const headCells = [
    {
        id: 'station',
        numeric: false,
        disablePadding: true,
        label: 'Arbeitsschritt',
    },
    {
        id: 'position',
        numeric: true,
        disablePadding: true,
        label: 'Position',
    },
    {
        id: 'duration',
        numeric: true,
        disablePadding: true,
        label: 'Dauer',
    },
    {
        id: 'employee',
        numeric: true,
        disablePadding: true,
        label: 'Mitarbeiter',
    },
];

const StationTable = (props) => {
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * 5 - props.rows.length) : 0;

    return (
        <Paper sx={{ minWidth: 500 }}>
            <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, }}>
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    Produktionsschritte
                </Typography>
            </Toolbar>
            <TableContainer sx={{ maxWidth: 500 }}>
                <Table aria-labelledby="employee table" >
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    align={headCell.numeric ? 'right' : 'left'}
                                    style={{ fontSize: '20px' }}
                                >
                                    {headCell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {props.rows
                            .slice(page * 5, page * 5 + 5)
                            .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.name}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.station}</TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )} */}
                        {(props.rows || []).slice(page * 5, page * 5 + 5)
                            .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow hover tabIndex={-1} key={row.station.name}>
                                        <TableCell component="th" id={labelId} scope="row">
                                            {row.station.name}
                                        </TableCell>
                                        <TableCell align="right">{row.pos}</TableCell>
                                        <TableCell align="right">{row.station.duration}s</TableCell>
                                        <TableCell align="right">
                                            {(row.station.employees || []).map(employee => (
                                                <div key={employee.id}>
                                                    {employee.name}
                                                </div>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={props.rows.length}
                rowsPerPage={5}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>
    );
}

export default StationTable;