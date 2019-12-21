import React, { useEffect } from "react";
import usePrefetch from "../../../lib/usePrefetch";
import useLogin from "../../../lib/useLogin";
import { Redirect } from "react-router-dom";
import { getUserData } from "../../../lib/api/getUserData";
import Page from "../../Page";
import ChangeInfo from "../../PageComponent/InfoPage/changeInfo";
function InfoPage() {
    const user = useLogin();
    const [data, error] = usePrefetch<any>("MyInfo", async () => {
        if (!user) return;
        const id = user.data.userId;
        return await getUserData(id, user.token);
    });
    useEffect(() => {
        if (error) alert(error);
    }, [error]);

    if (!user) return <Redirect to="/signin" />;

    return (
        <Page title={data ? `${data.nickname}님의 프로필 수정` : ""} whiteColor colorfulLogo>
            {!data ? null : <ChangeInfo {...data} />}
        </Page>
    );
}

export default InfoPage;