import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="footer">
      <Typography.Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target={"_blank"}>
        Condition of Use
      </Typography.Link>
      <Typography.Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target={"_blank"}>
        Privacy Notice
      </Typography.Link>
      <Typography.Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target={"_blank"}>
        Consumer Health Data Privacy Disclosure
      </Typography.Link>
      <Typography.Link href="tel:+9492417821" target={"_blank"}>
        +1 949-241-7821
      </Typography.Link>
    </div>
  );
}
export default AppFooter;
