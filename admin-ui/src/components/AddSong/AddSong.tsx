import React, {SetStateAction} from 'react';
import {useDropzone} from "react-dropzone";
import RedirectButton from "../CustomButtons/RedirectButton";
import Dropzone from "../Dropzone/Dropzone";
import {FormControl, TextField} from "@mui/material";
import styled from "@emotion/styled";
import styles from './AddSong.module.css';
import SimpleButton from "../CustomButtons/SimpleButton";
import {getToken, queryConfig, queryConfigMultipart} from "../QueryConfig";
import axios from "axios";
import {useParams} from "react-router-dom";
import {TailSpin} from "react-loading-icons";
import {Form} from "react-bootstrap";

const AddSong: React.FC<{playlistId: string, artistId: number, setIsCreatingSong: React.Dispatch<SetStateAction<boolean>>}> = (props) => {
    const [updating, setUpdating] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string | undefined>();
    const [error, setError] = React.useState<string>("");
    const dropData = useDropzone({
        minSize: 0,
        maxSize: 1048576*5,
    });
    const token = getToken();

    const handleAddSong = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setUpdating(true);
        const form: any = new FormData();
        form.append('name', name!);
        form.append('userId', props.artistId);
        form.append('song', dropData.acceptedFiles![0])
        let nameFile = dropData.acceptedFiles[0].name.split('.');
        if (nameFile[nameFile.length-1]!=="mp3"){
                setUpdating(false);
                setError("It is not mp3 extension");
                return;
        }
        if (!nameFile) {
            setUpdating(false);
            setError("Upload song to proceed");
            return;
        }
        axios.post("/content/song", form, queryConfigMultipart(token))
            .then(res => {
                axios.post(`/content/song/${res.data['id']}/playlist/${props.playlistId}`, {}, queryConfig(token))
                    .catch(er => console.log)
                setUpdating(false);
                props.setIsCreatingSong(false);
            })
            .catch(er => {
                setUpdating(false);
                console.log(er)
            });
    }

    const StyledTextField = styled(TextField)`
      width: 500px;
      margin-left: 270px;
      margin-top: 20px;
    `

    return (
        <div>
            <button
                className={`${styles.info} ${styles.back}`}
                onClick={() => props.setIsCreatingSong(false)}
            >
                BACK
            </button>
            <h1
                className={styles.titleAdd}
            >
                Add Song
            </h1>
            <div className={styles.formAdd}>
                <Form onSubmit={handleAddSong}>
                    <FormControl>
                        <Dropzone text={"Click or drag the file to upload song (5mb max)"} {...dropData}/>
                        <StyledTextField
                            onBlur={(e) => setName(e.target.value)}
                            onChange={() => setError("")}
                            label="name"
                            type="text"
                            multiline={false}
                            inputProps={{
                                readOnly: updating,
                                autoComplete: 'off'
                            }}
                            color="secondary"
                            defaultValue={name}
                            required
                        />
                        {
                            updating ?
                                <TailSpin
                                    className={styles.spinner}
                                    stroke="#678DA6"
                                    strokeWidth="4px"/>
                                :
                                <button
                                    className={`${styles.info} ${styles.update}`}
                                >
                                    ADD
                                </button>

                        }
                    </FormControl>
                    <b style={{color:'red', marginLeft: '270px'}}>{error}</b>
                </Form>
            </div>
        </div>
    );
};


export default AddSong;