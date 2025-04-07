import React from 'react'

function Avatar({src, name='', type='user', size=50, style={}}) {

    const getInitials = (name) => {
        const nameParts = name.split(' ')
        const initials = nameParts.map(part => part[0]).join(''.toUpperCase())
        return initials.substring(0, 2)
    }

    const avatarStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: type === 'user'? '50%': '20%',
        backgroundColor: '#a55728',
        color: '#FFF',
        fontSize: size / 2.5, // Scale font size based on avatar size
        fontWeight: 'bold',
        textTransform: 'uppercase',
        ...style
    }

    if (type === 'department') {
        return (<div style={avatarStyle}><i className="fa-solid fa-users"></i></div>)
      } else if (type === 'project') {
        return (<div style={avatarStyle}><i className="fa-solid fa-diagram-project"></i></div>)
      } else {
        return src? (
          <img src={src} alt={name} style={{...avatarStyle, objectFit: 'cover'}}/>
        ) : (<div style={avatarStyle}>{getInitials(name)}</div>)
      }
}

export default Avatar
