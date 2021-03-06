import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({ title, type, icon, onClick }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} onClick={onClick}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {type}
        </Typography>
        <Grid direction="row" style={{ marginTop: 20, display: 'flex', justifyContent: 'space-around' }}>
          <Grid alignItems="center">
            {icon}
          </Grid>
          <Typography variant="h5" component="h2" color="textSecondary">
            {title}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}