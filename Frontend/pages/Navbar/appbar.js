    <Box sx={{ flexGrow: 0, zIndex:'90'}}>
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhandsome-man&psig=AOvVaw3dQTYvS88ji4NhBhLtpSnk&ust=1686996090674000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNiV3KfEx_8CFQAAAAAdAAAAABAE" />
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        > 
            {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
            ))}
        </Menu>
        </Box>