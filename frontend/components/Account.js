
import User from './User';
import ChangeInformation from './account-page/ChangeInformation';
import ChangePassword from './account-page/ChangePassword';
import UpdateAPIKey from './account-page/UpdateAPIKey';

const Account = () => (
            <User>
                 {({data: { me }}) => (
                     <>
                    
                        {me && (
                            <>
                                <ChangeInformation user={me} />
                                <ChangePassword />
                                <UpdateAPIKey user={me} />
                            </>
                        )}
                        
                    </>
                    
                    
                )}
            </User>
)

export default Account;