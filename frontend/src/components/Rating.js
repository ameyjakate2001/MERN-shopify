import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const Rating = ({ rating, reviews }) => {
    return (
        <React.Fragment>
            <div style={{ marginTop: 10, marginBottom: 10 }}>
                {
                    rating >= 1 ?
                        <StarIcon color="secondary" fontSize="small" /> : rating >= 0.5 ?
                            <StarHalfIcon color="secondary" fontSize="small" /> :
                            <StarBorderIcon color="secondary" fontSize="small" />
                }
                {
                    rating >= 2 ?
                        <StarIcon color="secondary" fontSize="small" /> : rating >= 1.5 ?
                            <StarHalfIcon color="secondary" fontSize="small" /> :
                            <StarBorderIcon color="secondary" fontSize="small" />
                }
                {
                    rating >= 3 ?
                        <StarIcon color="secondary" fontSize="small" /> : rating >= 2.5 ?
                            <StarHalfIcon color="secondary" fontSize="small" /> :
                            <StarBorderIcon color="secondary" fontSize="small" />
                }
                {
                    rating >= 4 ?
                        <StarIcon color="secondary" fontSize="small" /> : rating >= 3.5 ?
                            <StarHalfIcon color="secondary" fontSize="small" /> :
                            <StarBorderIcon color="secondary" fontSize="small" />
                }
                {
                    rating >= 5 ?
                        <StarIcon color="secondary" fontSize="small" /> : rating >= 4.5 ?
                            <StarHalfIcon color="secondary" fontSize="small" /> :
                            <StarBorderIcon color="secondary" fontSize="small" />
                }
            </div>
        </React.Fragment>
    )
}

export default Rating
