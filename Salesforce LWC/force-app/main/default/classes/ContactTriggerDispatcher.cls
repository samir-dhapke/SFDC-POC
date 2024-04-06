public class ContactTriggerDispatcher {
    public static void dispatch(System.TriggerOperation operationType){
        switch on operationType{
            WHEN AFTER_INSERT{
                ContactTriggerHandler.handleAfterInsert((Map<Id, Contact>)Trigger.newMap); // Map<Id, sObject>
            }
            WHEN AFTER_UPDATE{
                ContactTriggerHandler.handleAfterUpdate((Map<Id, Contact>)Trigger.newMap, (Map<Id, Contact>)Trigger.oldMap);
            }
            WHEN AFTER_DELETE{
                ContactTriggerHandler.handleAfterDelete((Map<Id, Contact>)Trigger.oldMap);
            }
            WHEN AFTER_UNDELETE{
                ContactTriggerHandler.handleAfterUndelete((Map<Id, Contact>)Trigger.newMap); // Map<Id, sObject>
            }
           // WHEN BEFORE_INSERT{
               // ContactTriggerHandler.handleBeforeInsert(Trigger.new); // Map<Id, sObject>
           // }
        }
    }
}