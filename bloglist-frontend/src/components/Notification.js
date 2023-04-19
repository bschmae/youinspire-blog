import { useSelector } from 'react-redux';

const Notification = () => {
    let style = {
        background: 'lightgrey',
        border: 'solid',
        padding: 10,
    
      };

    const notification = useSelector(({ notification }) => {
        if (notification === null) {
            style = {
                display: 'none'
            }
        };

        return notification;
    });

    return (
        <div style={style} >
            { notification }
        </div>
    );
};

export default Notification;