import React, { useEffect, useState } from 'react';
import { FormControl, TextField } from "@mui/material";
import axios from 'axios';
import queryConfig from '../QueryConfig';
import styled from "@emotion/styled";
import Sidebar from "../Sidebar";
import styles from './User.module.css'
import {useNavigate, useParams} from "react-router-dom";
import { TailSpin } from 'react-loading-icons'

interface IUserData {
    id: number,
    email: string,
    username: string,
    type: string,
    premiumType: string,
    subscriptionStart: string,
    subscriptionEndL: string
}

const User: React.FC = () => {
    const [user, setUser] = useState<IUserData>();
    const [fetching, setFetching] = useState<boolean>(true);
    const navigate = useNavigate();
    const props = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/id/${props.id}`, queryConfig)
            .then(res => {
                setFetching(false);
                setUser(res.data);
            })
            .catch(console.log)
    }, []);

    const StyledTextField = styled(TextField)`
      width: 500px;
      margin-left: 270px;
      margin-top: 20px;
    `

    return (
        <div>
            <Sidebar/>
            <button
                onClick={() => navigate("/users", {replace:false})}
                className={styles.back}
                >BACK
            </button>
            <div className={styles.form}>
                {
                    fetching ?
                        <TailSpin className={styles.spinner} stroke="#678DA6" strokeWidth="3px"/> :
                        <FormControl>
                            {
                                user &&
                                Object.keys(user!).map((key, index) =>
                                    <StyledTextField
                                        key={key}
                                        label={key.replaceAll('_', ' ')}
                                        defaultValue={user[key as keyof typeof user]}
                                        inputProps={{
                                            readOnly: true
                                        }}
                                    />)
                            }
                        </FormControl>
                }
            </div>
        </div>
    );
};

export default User;