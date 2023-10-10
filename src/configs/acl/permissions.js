import { AbilityBuilder } from "@casl/ability";

export default function defineRulesFor(role) {
  const { can, rules } = AbilityBuilder.extract();

  switch (role) {
    case "admin":
      can("manage", "all");
      break;
    case "manager":
      can("manage", "PurchaseOrder");
      can("manage", "Report");
      can("read", "Product");
      can("read", "Inventory");
      break;
    case "projectLead":
      can("manage", "Report");
      break;
    case "sales":
      can("manage", "SalesOrder");
      break;
    default:
      can("read", "all");
  }

  return rules;
}