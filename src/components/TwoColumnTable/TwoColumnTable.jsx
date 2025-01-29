import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material'

import { formatIntoDollars } from '../../utils/utils'

const tableStyles = {
    'tr, td': {
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
        overflowWrap: 'anywhere',
        '&:last-child': {
            borderBottom: 'none',
        },
    },
    th: {
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        borderBottom: 'none',
    },
}

const TwoColumnTable = ({ rows = [] }) => {
    if (rows.length === 0) {
        return null
    }

    return (
        <TableContainer
            component={Paper}
            elevation={2}
            sx={{ width: 'fit-content', maxWidth: '100%' }}
        >
            <Table sx={{ ...tableStyles }} aria-label="simple table">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell
                                component="th"
                                scope="row"
                                sx={{ minWidth: 180 }}
                            >
                                {row.name}
                            </TableCell>
                            <TableCell align="left">
                                {Number.isInteger(row.value)
                                    ? formatIntoDollars(row.value)
                                    : row.value}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TwoColumnTable
