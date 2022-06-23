import { useField } from "formik";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface ThemeProps {
  name: string;
  label: string;
  value: string;
  img: string;
  description: string;
  themes: string[] | [];
}

const ThemeOptions = ({name, label, value, img, description, themes}: ThemeProps) => {
  const [field, meta] = useField(name)
  
  const findIndex = () => {
		const index = themes.findIndex((object) => {
			return object = value;
    });
    return index
	};

  return (
    <Card sx={{ maxWidth: 600, mx: 2 }}>
      <CardMedia
        component="img"
        height="170"
        image={img}
        alt={label}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <FormControlLabel key={name} control={<Checkbox checked={findIndex() > -1} {...field} value={value} />} label={label} />
      </CardActions>
    </Card>
    
  )
}

export default ThemeOptions