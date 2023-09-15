import { Result, Button } from "antd"
import Head from "next/head"

const Error404 = () => {
      return (
            <>
                  <Head>
                        <title>404</title>
                  </Head>
                  <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={<Button type="primary">Back Home</Button>}
                  />
            </>
      )
}
export default Error404