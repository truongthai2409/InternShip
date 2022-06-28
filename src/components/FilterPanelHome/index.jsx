import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardHome from "../CardHome";
import "./styles.scss";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3, padding: 0 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function FilterPanelHome() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <Box sx={{ width: "100%", paddingLeft: "30px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: "24px" }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Mới nhất" {...a11yProps(0)} />
                    <Tab label="Đánh giá" {...a11yProps(1)} />
                    <Tab label="Liên quan" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel className="tabPanel" value={value} index={0}>
                <CardHome
                    title="Thực tập ReactJS"
                    fontSize={10}
                    nameCompany="Công ty R2S"
                    tagName={["Front end", "Full time"]}
                    start={4.5}
                    location="Hồ Chí Minh"
                    time={["09/06/2022", "09/08/2022"]}
                />
                <CardHome
                    title="Thực tập Java"
                    fontSize={10}
                    nameCompany="Công ty R2S"
                    tagName={["Back end", "Full time"]}
                    start={4}
                    location="Hồ Chí Minh"
                    time={["09/06/2022", "09/08/2022"]}
                />
                <CardHome
                    title="Thực tập Flutter"
                    fontSize={10}
                    nameCompany="Công ty R2S"
                    tagName={["Mobile", "Full time"]}
                    start={4}
                    location="Hồ Chí Minh"
                    time={["09/06/2022", "09/08/2022"]}
                />
                <CardHome
                    title="Thực tập .Net"
                    fontSize={10}
                    nameCompany="Công ty R2S"
                    tagName={["Mobile", "Full time"]}
                    start={4.5}
                    location="Hồ Chí Minh"
                    time={["09/06/2022", "09/08/2022"]}
                />
                <CardHome
                    title="Thực tập React Native"
                    fontSize={10}
                    nameCompany="Công ty R2S"
                    tagName={["Front end", "Full time"]}
                    start={5}
                    location="Hồ Chí Minh"
                    time={["09/06/2022", "09/08/2022"]}
                />
                <CardHome
                    title="Thực tập React Native"
                    fontSize={10}
                    nameCompany="Công ty R2S"
                    tagName={["Front end", "Full time"]}
                    start={5}
                    location="Hồ Chí Minh"
                    time={["09/06/2022", "09/08/2022"]}
                />
                <CardHome
                    title="Thực tập React Native"
                    fontSize={10}
                    nameCompany="Công ty R2S"
                    tagName={["Front end", "Full time"]}
                    start={5}
                    location="Hồ Chí Minh"
                    time={["09/06/2022", "09/08/2022"]}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* <CardHome /> */}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {/* <CardHome /> */}
            </TabPanel>
        </Box>
    );
}
