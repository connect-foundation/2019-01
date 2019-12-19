import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from './style';
import URL from '../../constants/url';
import UserList from './UserCategory';
import QuizList from './QuizCategory';
import NicknameList from './NicknameCategory';
import ImageList from './ImageCategory';

const Admin = () => {
  const [body, setBody] = useState(<UserList />);
  const listItem = [
    { text: 'USERS', component: <UserList /> },
    { text: 'NICKNAMES', component: <NicknameList /> },
    { text: 'QUIZS', component: <QuizList /> },
    { text: 'IMAGES', component: <ImageList /> },
  ];

  const classes = useStyles();

  const changeBody = (component) => setBody(component);

  const makeCategory = () => listItem.map((category) => (
    <ListItem button key={category.text} onClick={() => changeBody(category.component)}>
      <ListItemText primary={category.text} />
    </ListItem>
  ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left">
        <img src={URL.ADMIN_BACKGROUND} className={classes.toolbar} alt="admin-background" />
        <List>
          {makeCategory()}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Typography component="span">{body}</Typography>
      </main>
    </div>
  );
};

export default Admin;
