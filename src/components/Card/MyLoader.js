import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={0}
    width={150}
    height={260}
    viewBox="0 0 150 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="150" height="155" />
    <rect x="0" y="166" rx="10" ry="10" width="150" height="15" />
    <rect x="0" y="192" rx="10" ry="10" width="100" height="15" />
    <rect x="113" y="223" rx="10" ry="10" width="32" height="32" />
    <rect x="0" y="232" rx="10" ry="10" width="80" height="25" />
  </ContentLoader>
);

export default MyLoader;
