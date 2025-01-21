import { Alert, AlertTitle, Typography } from '@mui/material'
import { isJSON } from '../../utils/utils'

const Error = ({ error, message }) => {
    let status
    let url = ''

    if (isJSON(error)) {
        status = JSON.parse(error).status || ''
        url = JSON.parse(error).url || ''
    } else {
        status = error
    }

    return (
        <Alert severity="error" sx={{ marginBottom: '1rem' }}>
            <AlertTitle>Error{status ? ` - ${status}` : null}</AlertTitle>
            <Typography component="pre">{message}</Typography>
            <br />
            {url.length > 0 && <Typography>URL: {url}</Typography>}
        </Alert>
    )
}

export default Error
