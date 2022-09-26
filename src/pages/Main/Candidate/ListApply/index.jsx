import { Pagination } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowButton from 'src/components/ArrowButton';
import CardJob from 'src/components/CardJob';
import FeedBack from 'src/components/FeedBack';
import Null from 'src/components/Null';
import UserCard from 'src/components/UserCard';
import { TabTitle } from 'src/utils/GeneralFunctions';

const ListApply = () => {
    TabTitle("Công việc quan tâm");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState();
    const navigate = useNavigate();
    let { careListOfPrivate, careListOfPrivateHavePages } = useSelector(
        (state) => state.mark);

    const eleDuplicate = [];
    for (let i = 0; i < careListOfPrivate?.length; i++) {
        for (let j = 0; j < careListOfPrivate?.length; j++) {
            if (careListOfPrivate[i] === careListOfPrivate[j]) {
                eleDuplicate.push(careListOfPrivate[i]);
            }
        }
    }
    const handleBackClick = () => {
        navigate(-1);
    };
    useEffect(() => {
        setTotalPage(careListOfPrivateHavePages?.totalPages);
    }, []);
    const handlePagination = (page) => {

        setCurrentPage(parseInt(page));
        window.scroll(0, 0);
    };
    return (
        <Box sx={{ width: "100%", marginTop: 4 }}>
            <div className="view-list">
                <div className="grid_container">
                    <div className="candidate_job">
                        <div className="view-list__job-card">
                            {careListOfPrivate?.length > 0
                                ? careListOfPrivate.map((jobCare) => (
                                    <div key={jobCare.id}>
                                        <CardJob
                                            jobCare={jobCare}
                                            eleDuplicate={eleDuplicate}
                                        />
                                    </div>
                                )) : <></>}

                        </div>

                        {careListOfPrivateHavePages?.totalPages === 0 ? <Null image={"https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_21.jpg"} /> :
                            <div
                                className="view-list-page"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    flexDirection: "row-reverse",
                                    alignItems: "center",
                                }}
                            >
                                <Stack spacing={2}>
                                    {careListOfPrivateHavePages.totalItems > 3 ?
                                        <Pagination
                                            page={careListOfPrivateHavePages?.numberOfCurrentPage || 0}
                                            defaultPage={1}
                                            onChange={(e) => handlePagination(e.target.textContent)}
                                            count={totalPage || 1}
                                            variant="outlined"
                                            shape="rounded"
                                            size="medium"
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                flexDirection: "row-reverse",
                                                alignItems: "center",
                                                marginLeft: "150px",
                                            }}
                                        /> : ""}
                                </Stack>
                                <div className="demand-detail__back" onClick={handleBackClick}>
                                    <ArrowButton
                                        direction="left"
                                        text="Trở lại"
                                        fontSize="15px"
                                    />
                                </div>
                            </div>}
                    </div>
                    <div className="candidate_info">
                        <div className="view-list__job-user-card" style={{ paddingBottom: 22 }}>
                            <UserCard />
                            <FeedBack />
                        </div>
                    </div>
                </div>
            </div>
        </Box >
    )
}

export default ListApply;