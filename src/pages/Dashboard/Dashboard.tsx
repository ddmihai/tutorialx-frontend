import { useEffect, useState } from "react"
import { axiosInstance } from "../../axiosInstance/axiosInstance"
import Banner from "./components/Banner"
import Loading from "../../components/Loading/Loading";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import LatestCreatedTutorials from "./components/LatestCreatedTutorials";
import { Steps } from "../../components/Steps/Steps";




export interface IUser {
    _id: string;
    name: string;
    email: string;
    joinDate: Date;
    __v: number;
    avatar: string;
}


const Dashboard = () => {

    const navigate = useNavigate();


    const [loading, setLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUser | undefined>();




    // Get user data
    const getUserData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/users/get-data');
            if (response.status === 200) {
                setUserData(response.data.user);
                sessionStorage.setItem('userId', response.data.user._id);
                setLoading(false);
            }
        }
        catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401 || error.response?.status === 404) {
                    // Handle 401 Unauthorized error
                    alert('You need to login first');
                    navigate('/login');
                    setLoading(false);
                }
                else {
                    // Handle other errors
                    alert(error.response?.data);
                    console.log(error.response?.data);
                    setLoading(false);
                }
            }
        }
    }










    useEffect(() => {
        getUserData();
    }, []);





    if (loading) {
        return <Loading title="Your request is processing" subtitle="Please wait. We will be back soon..." />
    };



    return (
        <main>
            <Banner
                joinedAt={userData ? new Date(userData.joinDate) : new Date()}
                name={userData?.name || ''}
            />

            <LatestCreatedTutorials />
            <Steps />


        </main>
    )
}

export default Dashboard
