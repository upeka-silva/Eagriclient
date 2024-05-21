import { Box } from "@mui/material";




const ChatMessage = ({
    message,
}) => {


    return (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 
        //   message.sender === username ? 'flex-end' : 
          'flex-start', margin: '10px 0' }}>
          <Box sx={{ marginRight:
            //  message.sender === username ? '8px' : 
             'auto', display: 'flex', flexDirection: 
            //  message.sender === username ? 'row-reverse' : 
             'row', alignItems: 'center', gap: 1 }}>
            {/* <Avatar name={message.sender} size="35" round={true} />
            <h4>{message.sender}</h4> */}
          </Box>
          <Box sx={{
            marginRight: 
            // message.sender === username ? '8px' :
             'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '60%',
            height: '16px',
            padding: '10px',
            borderRadius: '16px',
            backgroundColor: 'success.main',
            wordWrap: 'break-word',
          }}>
            <p style={{ color: 'white' }}>{message}</p>
          </Box>
        </Box>
        
    );
}

export default ChatMessage;