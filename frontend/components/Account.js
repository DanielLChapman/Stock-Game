
import User from './User';
import ChangeInformation from './account-page/ChangeInformation'

const Account = () => (
            <User>
                 {({data: { me }}) => (
                     <>
                    
                        {me && (
                            <>
                                <ChangeInformation user={me} />
                            </>
                        )}
                        
                    </>
                    
                    
                )}
            </User>
)

export default Account;