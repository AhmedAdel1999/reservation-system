import { Room } from "../../interfaces/Room";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {Card,Stack,Rating,CardMedia,CardContent, Typography} from '@mui/material';
import "./roomCard.scss"

type RoomCardProps = {
    roomInfo:Room
}


const RoomCard = ({roomInfo}:RoomCardProps) =>{

    return(
        <Card className="roomcard">
          <CardMedia
            component='img'
            className="cardimg"
            image={`${roomInfo.image}`}
            alt='image'
          />
          <CardContent>

            <Typography variant="h5"className="roomlink" gutterBottom>
                {roomInfo.name}
            </Typography>

            <Typography variant="h5" className="roompriceinfo" gutterBottom>
                ${roomInfo.pricePerNight} / Per Night
            </Typography>

            <Stack spacing={0.5} direction="row">
                <Rating
                    value={roomInfo.ratings}
                    precision={0.5}
                    readOnly
                    size='medium'
                    className="roomrating"
                    icon={<StarIcon fontSize='inherit' />}
                    emptyIcon={<StarBorderIcon fontSize='inherit' />}
                />
                <Typography>
                    {`(${Math.ceil(roomInfo.ratings)}) Reviews`}
                </Typography>
            </Stack>

          </CardContent>
        </Card>
    )
}
export default RoomCard;