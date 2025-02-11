import { Alert, AlertTitle, Typography } from '@mui/material'
import { isJSON } from '../../utils/utils'

const Error = ({ error, message }) => {
    let status
    let url = ''

    if (isJSON(error)) {
        url = JSON.parse(error).url || ''
    } else {
        status = error
    }

    return (
        <Alert severity="error" sx={{ margin: '1rem 0' }}>
            <AlertTitle>Error{status ? ` - ${status}` : null}</AlertTitle>
            <Typography component="pre">{message}</Typography>
            <br />
            {url.length > 0 && <Typography>URL: {url}</Typography>}
        </Alert>
    )
}

export default Error
