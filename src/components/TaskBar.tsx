import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MoreIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';


function TaskBar() {
    return (
        <>
          <AppBar sx={{px: 1}}>
              <Container sx={{px: {xs: 4, sm: 5}}}>
                  <Grid container direction={'row'} sx={{justifyContent: 'space-between'}}>
                      <Typography component={'h1'} sx={{fontSize: '1.4rem', fontWeight: '500', alignContent: 'center', pl: '3px'}}>Tasks</Typography>
                      <Box>
                          <IconButton
                              size="large"
                              aria-label="display more actions"
                              edge="end"
                              color="inherit"
                          >
                              <AddIcon />
                          </IconButton>
                          <IconButton
                              size="large"
                              aria-label="display more actions"
                              edge="end"
                              color="inherit"
                          >
                              <MoreIcon />
                          </IconButton>
                      </Box>
                  </Grid>
              </Container>
          </AppBar>
        </>
    );
}

export default TaskBar;