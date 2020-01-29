
import User from './User';
import ChangeInformation from './account-page/ChangeInformation';
import ChangePassword from './account-page/ChangePassword'

const Account = () => (
            <User>
                 {({data: { me }}) => (
                     <>
                    
                        {me && (
                            <>
                                <ChangeInformation user={me} />
                                <ChangePassword />
                            </>
                        )}
                        
                    </>
                    
                    
                )}
            </User>
)

export default Account;