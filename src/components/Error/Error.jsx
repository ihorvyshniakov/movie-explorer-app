import { Alert, AlertTitle, Typography } from '@mui/material'

const Error = ({ error, message }) => {
    const { status, url = '' } = JSON.parse(error)

    return (
        <Alert severity="error" sx={{ marginBottom: '1rem' }}>
            <AlertTitle>Error - {status}</AlertTitle>
            <Typography component="pre">{message}</Typography>
            <br />
            {url.length > 0 && <Typography>File: {url}</Typography>}
        </Alert>
    )
}

export default Error
